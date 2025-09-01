using Minton.Core.Shared;

namespace Minton.Core.Account.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string? Image { get; set; }
        public DateTime? Birthday { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Parameterless constructor for EF Core
        public User() { }

        public User(string firstName, string lastName, string email, string passwordHash, string phone, string userName)
        {
            ValidateUserData(firstName, lastName, email, phone, userName);
            
            FirstName = firstName;
            LastName = lastName;
            Email = email.ToLowerInvariant();
            PasswordHash = passwordHash;
            Phone = phone;
            UserName = userName.ToLowerInvariant();
        }

        public void UpdateProfile(string firstName, string lastName, string phone, string? image, DateTime? birthday)
        {
            ValidateUserData(firstName, lastName, Email, phone, UserName);
            
            FirstName = firstName;
            LastName = lastName;
            Phone = phone;
            Image = image;
            Birthday = birthday;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            IsActive = false;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Activate()
        {
            IsActive = true;
            UpdatedAt = DateTime.UtcNow;
        }

        public string GetFullName() => $"{FirstName} {LastName}";

        private static void ValidateUserData(string firstName, string lastName, string email, string phone, string userName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
                throw new DomainException("FirstName cannot be empty");
            
            if (string.IsNullOrWhiteSpace(lastName))
                throw new DomainException("LastName cannot be empty");
            
            if (string.IsNullOrWhiteSpace(email) || !IsValidEmail(email))
                throw new DomainException("Invalid email format");
            
            if (string.IsNullOrWhiteSpace(phone))
                throw new DomainException("Phone cannot be empty");
            
            if (string.IsNullOrWhiteSpace(userName))
                throw new DomainException("UserName cannot be empty");
            
            if (userName.Length < 3)
                throw new DomainException("UserName must be at least 3 characters");
        }

        private static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
