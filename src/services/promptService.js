import axios from 'axios';

const promptService = {
  getAllPrompts: async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/prompts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching prompts:', error);
      throw error.response?.data || { message: 'Failed to fetch prompts' };
    }
  },

  getPromptByBusinessType: async (businessType) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/prompts/${businessType}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching prompt:', error);
      throw error.response?.data || { message: 'Failed to fetch prompt' };
    }
  },

  updatePrompt: async (businessType, prompt) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/prompts/update`, {
        business_type: businessType,
        prompt: prompt
      });
      return response.data;
    } catch (error) {
      console.error('Error updating prompt:', error);
      throw error.response?.data || { message: 'Failed to update prompt' };
    }
  }
};

export default promptService;