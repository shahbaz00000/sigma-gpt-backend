const { InferenceClient } = require("@huggingface/inference");



const generateContent = async (selfDescription, jobDescription, resume) => {
    const client = new InferenceClient(process.env.HF_TOKEN);

    const prompt = `
You are an expert technical interviewer and career coach.

Analyze the candidate's Resume, Self Description, and Job Description.
Analyze the candidate's profile against the job requirements and generate:
- A match score (0-100)
- Relevant technical and behavioral interview questions with answers
- Skill gaps with severity
- A day-wise preparation plan

Return ONLY valid JSON.

IMPORTANT RULES:
- Do NOT use Markdown.
- Do NOT use \`\`\`json.
- Do NOT write "Interview Report".
- Do NOT add any explanation before or after the JSON.
- The response must be directly parseable using JSON.parse().
- Follow EXACTLY the JSON structure shown below.

JSON STRUCTURE:

{
  "score": 0,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "task": []
    }
  ]
}

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;


    const response = await client.chatCompletion({
        model: "Qwen/Qwen3-32B",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0,
        top_p: 0.1,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
};

module.exports = generateContent;