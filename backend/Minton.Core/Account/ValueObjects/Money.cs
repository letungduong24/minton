using Minton.Core.Shared;

namespace Minton.Core.Account.ValueObjects
{
    public class Money : ValueObject
    {
        public decimal Amount { get; private set; }
        public string Currency { get; private set; }

        private Money(decimal amount, string currency)
        {
            Amount = amount;
            Currency = currency;
        }

        public static Money Create(decimal amount, string currency = "USD")
        {
            if (amount < 0)
                throw new DomainException("Amount cannot be negative");

            if (string.IsNullOrWhiteSpace(currency))
                throw new DomainException("Currency cannot be empty");

            return new Money(amount, currency.ToUpperInvariant());
        }

        public Money Add(Money other)
        {
            if (Currency != other.Currency)
                throw new DomainException("Cannot add money with different currencies");

            return new Money(Amount + other.Amount, Currency);
        }

        public Money Subtract(Money other)
        {
            if (Currency != other.Currency)
                throw new DomainException("Cannot subtract money with different currencies");

            var result = Amount - other.Amount;
            if (result < 0)
                throw new DomainException("Result cannot be negative");

            return new Money(result, Currency);
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Amount;
            yield return Currency;
        }

        public override string ToString()
        {
            return $"{Amount:C} {Currency}";
        }

        public static implicit operator decimal(Money money) => money.Amount;
    }
}
