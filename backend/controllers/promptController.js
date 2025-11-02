import Prompt from "../models/Prompt.js";


export const getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prompts", error });
  }
};

export const getPromptByBusinessType = async (req, res) => {
  try {
    const { business_type } = req.params;
    const prompt = await Prompt.findOne({ business_type });

    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.status(200).json(prompt);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prompt", error });
  }
};


export const updatePrompt = async (req, res) => {
  try {
    const { business_type, prompt } = req.body;

    if (!business_type || !prompt) {
      return res.status(400).json({ message: "business_type and prompt are required" });
    }

    const updatedPrompt = await Prompt.findOneAndUpdate(
      { business_type },
      { prompt, updated_at: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Prompt updated successfully", updatedPrompt });
  } catch (error) {
    res.status(500).json({ message: "Error updating prompt", error });
  }
};
