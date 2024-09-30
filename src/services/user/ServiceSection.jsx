import instance from "../../utils/Axios";


export const ServiceGet = async ({ searchQuery = '', selectedCategories = [] }) => {
  console.log('Search query:', searchQuery);
  console.log('Selected categories:', selectedCategories);

  try {
      const response = await instance.get('/services', {
          params: {
              search: searchQuery || undefined, // Pass search query only if it's defined
              categories: selectedCategories.length ? selectedCategories.join(',') : undefined, // Pass selected categories as a comma-separated string if available
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
        return response.data
    }catch(error){
        console.log('error for the single service',error)
    }
}
export const CategoryGet=async()=>{
  try{
    const response=await instance.get('/getcategory')
    console.log('data jin teh ',response.data)
    return response.data
  }catch(error){
    console.log('category service erro',error);
    
  }
}