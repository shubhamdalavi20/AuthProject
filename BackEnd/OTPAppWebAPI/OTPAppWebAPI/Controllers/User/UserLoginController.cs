using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OTPApp.Constants;
using OTPApp.DTO.Generic;
using OTPApp.DTO.User.Login;
using OTPApp.DTO.User.Registration;
using OTPApp.Services.JWT;
using OTPApp.Services.User;
using System.Net;

namespace OTPAppWebAPI.Controllers.User
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserLoginController : ControllerBase
    {
        #region Private Members
        private readonly IUserAuthenticationService _userAuthenticationService;
        private readonly IJWTService _jWTService;
        #endregion
        #region Consructor
        /// <summary>
        /// Contructor initialization
        /// </summary>
        /// <param name="userAuthenticationService">UserAuthenticationService</param>
        /// <param name="jWTService">JWTService</param>
        public UserLoginController(IUserAuthenticationService userAuthenticationService, IJWTService jWTService)
        {
            _userAuthenticationService = userAuthenticationService;
            _jWTService = jWTService;

        }
        #endregion

        #region Public API Methods
        [AllowAnonymous]
        [HttpPost]
        [Route(APIConstants.Registration)]
        public async Task<GenericResponse<int>> Registration([FromBody] UserRegistrationDTO param)
        {
            GenericResponse<int> genericResponse = new GenericResponse<int>();
            try
            {
                //0 - username already exist, 1 - success
                var res = await _userAuthenticationService.Registration(param);
                genericResponse.Success = true;
                genericResponse.StatusCode = (int)HttpStatusCode.OK;
                genericResponse.Result = res;
                return genericResponse;
            }
            catch (Exception)
            {
                return new GenericResponse<int> { StatusCode = (int)HttpStatusCode.InternalServerError, 
                    Message = MessageConstants.InternalServerError, Result = -1};
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route(APIConstants.GetOTP)]
        public async Task<GenericResponse<UserOTPDTO>> GetOTP([FromBody] UserRegistrationDTO param)
        {
            GenericResponse<UserOTPDTO> genericResponse = new GenericResponse<UserOTPDTO>();
            try
            {
                //0 - bad req, 1 - success(token), 2 - username is not correct, 
                var res = await _userAuthenticationService.GetOTP(param);
                if (res.Response == 1)
                {
                    res.Token = _jWTService.GenerateToken(res.ID.ToString(), res.UserName);
                }
                genericResponse.Result = res;
                genericResponse.Success = true;
                genericResponse.StatusCode = (int)HttpStatusCode.OK;
                return genericResponse;
            }
            catch (Exception)
            {
                return new GenericResponse<UserOTPDTO> { StatusCode = (int)HttpStatusCode.InternalServerError, 
                    Message = MessageConstants.InternalServerError };
            }
        }

        [HttpPost]
        [Route(APIConstants.Login)]
        public async Task<GenericResponse<int>> Login([FromBody] UserLoginDTO param)
        {
            GenericResponse<int> genericResponse = new GenericResponse<int>();
            try
            {
                //0 - bad req, 1 - success, 2 - wrong user or otp, 3 - OTP Expired
                var res = await _userAuthenticationService.Login(param);
                genericResponse.Result = res;
                genericResponse.Success = true;
                genericResponse.StatusCode = (int)HttpStatusCode.OK;
                return genericResponse;
            }
            catch (Exception)
            {
                return new GenericResponse<int>
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    Message = MessageConstants.InternalServerError
                };
            }
        }

        #endregion
    }
}
