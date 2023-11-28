using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OTPApp.Services.JWT
{
    public class JWTService : IJWTService
    {
        #region Private Members
        private readonly IConfiguration _configuration;
        #endregion

        #region Constructor
        /// <summary>
        /// Constructor initialization
        /// </summary>
        /// <param name="configuration">Configuration</param>
        public JWTService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        #endregion

        #region Public Methods
        
        #endregion

        #region Private Methods
        
        public string GenerateToken(string id, string name)
        {
            var accessExpire = int.Parse(_configuration["JwtOptions:AccessExpire"]);
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtOptions:IssuerSigningKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var payload = new[] {
                new Claim("id", id),
                new Claim("name", name),
            };
            var token = new JwtSecurityToken(issuer:_configuration["JwtOptions:Issuer"], audience: _configuration["JwtOptions:Audience"],
                claims: payload, expires: DateTime.Now.AddSeconds(accessExpire), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion

    }
}
