const fetchUserAppMasters = async (email) => {
  try {
    const response = await fetch(`https://programador.emjuizdefora.com/api/user/public?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log('Error fetching users', error);
  }
};

export default fetchUserAppMasters;
