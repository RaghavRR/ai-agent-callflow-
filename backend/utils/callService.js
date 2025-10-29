export const callPhoneNumber = async (phoneNumber) => {
  try {
    if (!phoneNumber) throw new Error("Phone number is required");

    console.log(`📞 Initiating simulated call to ${phoneNumber}...`);

    // Mock API call simulation
    return {
      success: true,
      message: `Simulated call initiated successfully to ${phoneNumber}`,
      phoneNumber,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("❌ Error in callPhoneNumber:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};
