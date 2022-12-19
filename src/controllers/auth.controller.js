const httpStatus = require('http-status');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const { authService, userService, tokenService, emailService } = require('../services');

const loginWithFacebook = catchAsync(async (req, res) => {
  const { facebookAccessToken } = req.body;

  const facebookUser = await axios.get(config.facebook.graphApiUrl + '/me', {
    params: {
      access_token: facebookAccessToken,
      fields: 'id,name,email,picture',
      locale: 'en_US',
    },
  });
  console.log('auth.controller - facebookUser: ', facebookUser.data);

  const facebookUserLongLivedTokenResponse = await axios.get(config.facebook.graphApiUrl + '/oauth/access_token', {
    params: {
      grant_type: 'fb_exchange_token',
      client_id: config.facebook.appIdTest,
      client_secret: config.facebook.appSecretTest,
      fb_exchange_token: facebookAccessToken,
    },
  });
  console.log('auth.controller - facebookUserLongLivedToken: ', facebookUserLongLivedTokenResponse.data);

  var user = await userService.getUserByFacebookId(facebookUser.data.id);
  if (!user) {
    user = await userService.createUser({
      facebookName: facebookUser.data.name,
      facebookEmail: facebookUser.data.email,
      facebookId: facebookUser.data.id,
      facebookAccessToken: facebookAccessToken,
      facebookPicture: facebookUser.data.picture
    });
  }
  // const tokens = await tokenService.generateAuthTokens(user);

  const fnlTokens = await tokenService.generateAuthTokens(user);
  const tokens = {
    fnl: fnlTokens,
    facebook: {
      access: {
        token: facebookUserLongLivedTokenResponse.data.access_token,
        expires: facebookUserLongLivedTokenResponse.data.expires_in,
      }
    }
  }
  console.log('auth.controller - tokens: ', tokens);

  res.send({ user, tokens });
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  loginWithFacebook,
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
