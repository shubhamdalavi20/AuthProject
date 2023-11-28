namespace OTPApp.Services.JWT
{
    public interface IJWTService
    {
        /// <summary>
        ///  To generate token
        /// </summary>
        /// <param name="id">User id</param>
        /// <param name="name">User name</param>
        /// <returns>token</returns>
        public string GenerateToken(string id, string name);

    }
}
