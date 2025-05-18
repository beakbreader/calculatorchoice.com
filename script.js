async function askAI() {
  const question = document.getElementById("question").value;
  const answerDiv = document.getElementById("answer");

  answerDiv.innerText = "Thinking...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful high school physics and chemistry tutor. Explain everything step-by-step." },
        { role: "user", content: question }
      ],
      temperature: 0.5
    })
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || "No answer returned.";
  answerDiv.innerText = answer;
}
