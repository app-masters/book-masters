const fetchUserAppMasters = async (email) => {
    try {
        const response = await fetch(`https://programador.emjuizdefora.com/api/user/public?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (response.status === 404) {
            throw new Error(response.status, 'Usuário não encontrado');

        } else if (response.ok) {
            const user = response.json();
            return user;
        } else {
            throw new Error(response.status, 'Erro ao consultar a API');
        }
    } catch (error) {
        throw error;
    }
};

export default fetchUserAppMasters;