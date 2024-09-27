import instance from "../../utils/Axios";


export const ServiceGet = async (searchQuery = '') => {
    console.log('serch qurery ',searchQuery)
    try {
      const response = await instance.get('/services', {
        params: {
          search: searchQuery, // Send search query to the backend
        },
      });
      return response.data; // Return the response data (array of services)
    } catch (error) {
      console.log('Error fetching services', error);
    }
  };

export const ServiceGetById=async(serviceId)=>{
    try{
        const response=await instance.get(`/service/${serviceId}`)
        console.log(response.data)
        return response.data
    }catch(error){
        console.log('error for the single service',error)
    }
}

// export const SearchServie=async(se)