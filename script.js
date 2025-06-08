document.addEventListener('DOMContentLoaded', function() {
    const validateBtn = document.getElementById('validate');
    const ibanInput = document.getElementById('iban');
    const resultDiv = document.getElementById('result');
    
    validateBtn.addEventListener('click', function() {
        const iban = ibanInput.value.trim();
        
        if (!iban) {
            showResult('Please enter an IBAN', false);
            return;
        }
        
        try {
            // Assuming the IBAN validator library is properly imported in index.html
            // and has a validate function
            const isValid = window.IBANValidator && window.IBANValidator.isValid(iban);
            
            if (isValid) {
                showResult('Valid IBAN', true);
            } else {
                showResult('Invalid IBAN', false);
            }
        } catch (error) {
            showResult('Error validating IBAN: ' + error.message, false);
        }
    });
    
    function showResult(message, isValid) {
        resultDiv.textContent = message;
        resultDiv.className = isValid ? 'valid' : 'invalid';
    }
}); 