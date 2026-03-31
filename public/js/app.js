// Funções para Adicionar
        function openModal() { 
            const m = document.getElementById('modalAdd');
            if(m) m.style.display = 'flex'; 
        }
        function closeModal() { 
            const m = document.getElementById('modalAdd');
            if(m) m.style.display = 'none'; 
        }

        // Funções para Editar
        function openEditModal(id, name) {
            const modal = document.getElementById('modalEdit');
            const form = document.getElementById('formEdit');
            const inputName = document.getElementById('editName');

            if(modal && form && inputName) {
                inputName.value = name; 
                form.action = '/CRUD/update/' + id; 
                modal.style.display = 'flex';
            }
        }

        function closeEditModal() {
            const m = document.getElementById('modalEdit');
            if(m) m.style.display = 'none';
        }

        // Fecha o modal se clicar fora da caixa branca
        window.onclick = function(event) {
            if (event.target.className === 'modal') {
                closeModal();
                closeEditModal();
            }
        }