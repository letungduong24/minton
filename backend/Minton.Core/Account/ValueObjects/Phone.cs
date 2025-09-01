using Minton.Core.Shared;

namespace Minton.Core.Account.ValueObjects
{
    public class Phone : ValueObject
    {
        public string Value { get; private set; }

        private Phone(string value)
        {
            Value = value;
        }

        public static Phone Create(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone))
                throw new DomainException("Phone cannot be empty");

            if (!IsValidPhone(phone))
                throw new DomainException("Invalid phone format");

            return new Phone(NormalizePhone(phone));
        }

        private static bool IsValidPhone(string phone)
        {
            // Loại bỏ tất cả ký tự không phải số
            var digitsOnly = new string(phone.Where(char.IsDigit).ToArray());
            
            // Kiểm tra độ dài (10-15 số)
            return digitsOnly.Length >= 10 && digitsOnly.Length <= 15;
        }

        private static string NormalizePhone(string phone)
        {
            // Loại bỏ tất cả ký tự không phải số
            var digitsOnly = new string(phone.Where(char.IsDigit).ToArray());
            
            // Format: +84 123 456 789
            if (digitsOnly.Length == 11 && digitsOnly.StartsWith("0"))
            {
                return "+84" + digitsOnly.Substring(1);
            }
            
            return "+" + digitsOnly;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }

        public static implicit operator string(Phone phone) => phone.Value;
    }
}
