
        function calculateCalories() {
            const gender = document.getElementById('gender').value;
            const age = parseInt(document.getElementById('age').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const activityLevel = document.getElementById('activityLevel').value;

            if (isNaN(age) || isNaN(weight) || isNaN(height)) {
                alert('Por favor, preencha todos os campos com valores numéricos.');
                return;
            }

            let bmr;

            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }

            let tdee;

            switch (activityLevel) {
                case 'sedentary':
                    tdee = bmr * 1.2;
                    break;
                case 'lightlyActive':
                    tdee = bmr * 1.375;
                    break;
                case 'moderatelyActive':
                    tdee = bmr * 1.55;
                    break;
                case 'veryActive':
                    tdee = bmr * 1.725;
                    break;
                default:
                    alert('Selecione um nível de atividade.');
                    return;
            }

            const resultElement = document.getElementById('result');
            resultElement.innerHTML = `Para manter seu peso você precisa consumir aproximadamente ${Math.round(tdee)} calorias por dia.`;
        }