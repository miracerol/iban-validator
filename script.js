document.addEventListener('DOMContentLoaded', function() {
    const validateBtn = document.getElementById('validate');
    const ibanInput = document.getElementById('iban');
    const resultDiv = document.getElementById('result');
    
    validateBtn.addEventListener('click', function() {
        validateIban();
    });
    
    // Enable validation with Enter key
    ibanInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validateIban();
        }
    });
    
    function validateIban() {
        const iban = ibanInput.value.trim();
        
        if (!iban) {
            showResult('Please enter an IBAN number', false);
            return;
        }
        
        try {
            // Check if IBANValidator is loaded
            if (typeof window.IBANValidator === 'undefined') {
                showResult('IBAN validator could not be loaded', false);
                return;
            }
            
            const isValid = window.IBANValidator.isValid(iban);
            
            if (isValid) {
                const countryCode = window.IBANValidator.getCountryCode(iban);
                const formattedIban = window.IBANValidator.format(iban);
                showResult(`✅ Valid IBAN<br>Country: ${countryCode}<br>Format: ${formattedIban}`, true);
            } else {
                showResult('❌ Invalid IBAN number', false);
            }
        } catch (error) {
            console.error('IBAN validation error:', error);
            showResult('Error occurred while validating IBAN: ' + error.message, false);
        }
    }
    
    function showResult(message, isValid) {
        resultDiv.innerHTML = message;
        resultDiv.className = isValid ? 'result valid' : 'result invalid';
    }
}); 