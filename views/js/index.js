document.querySelector('.btn-preparar').addEventListener('click', renderizarBlocos);

        function renderizarBlocos() {
            const container = document.getElementById('container');
            container.innerHTML = ''; // Limpar o conteúdo anterior

            const qtdRepeticoes = document.querySelector('.qtdRefeicao').value;

            for (let i = 0; i < qtdRepeticoes; i++) {
                const blocoHTML = criarBlocoHTML(i + 1);

                // Adicionar o bloco à página
                container.innerHTML += blocoHTML;
            }
        }

        function criarBlocoHTML(i) {
            const bloco = `
            <div class="bloco">
                <h2 class='titulo'>Refeição ${i}</h2>

                <div class='blocoAlimento'>
                    <label for="alimento${i}">Alimento:</label>
                    <input class='inputRef' type="text" id="alimento${i}" />
                </div>
                
                <div class='blocoQtd'>
                    <label for="quantidade${i}">Quantidade:</label>

                    <div class='blocoQtd-input'>
                        <input class='inputRef' type="text" id="quantidade${i}" />

                        <select id="porcao${i}">
                            <option value="gramas">Gramas</option>
                            <option value="xicara">Xícara</option>
                            <option value="colheres">Colheres</option>
                        </select>
                    </div>
                </div>
                
                <button class="btn-preparar" onclick="adicionarItem(${i})">Adicionar</button>
                <ul id="listaItens${i}"></ul>
            </div>
        `;

            return bloco;
        }

        function adicionarItem(numeroBloco) {
            const alimentoInput = document.getElementById(`alimento${numeroBloco}`);
            const quantidadeInput = document.getElementById(`quantidade${numeroBloco}`);
            const porcaoInput = document.getElementById(`porcao${numeroBloco}`);
        
            const alimento = alimentoInput.value;
            const quantidade = quantidadeInput.value;
            const porcao = porcaoInput.value;
        
            const listaItens = document.getElementById(`listaItens${numeroBloco}`);
            const novoItem = document.createElement('li');
            novoItem.innerText = `${quantidade} ${porcao} de ${alimento}`;
            listaItens.appendChild(novoItem);
        
            // Limpar os inputs
            alimentoInput.value = '';
            quantidadeInput.value = '';
            porcaoInput.value = '';
        }
        
