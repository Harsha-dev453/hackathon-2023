import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)

// const openai = new OpenAI({
//   apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
// });
export type MarkType = "Email Marketing" | "Social Media Marketing" | "WebSite Marketing" | "SMS Marketing";
const config = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const {  bio, mark } = await req.json();
  // console.log("vibe",vibe)
  console.log("bio",bio)
  console.log("mark",mark)

 

  const context_gen = (mark:string) => {
    if(mark === "Email Marketing"){
      return "Email content body only with context to Storage industry for tenants to rent storage units";
    }
    else if(mark === "Social Media Marketing"){
      return "Social Media post with context to Storage industry for tenants to rent storage units also generate a catchy hashtag, also some trendy hashtags";
    }
    else if(mark === "SMS Marketing"){
      return "Create a SMS with context to Storage industry for tenants to rent storage units";
    }
  }

  const limit_lines = (mark:string) => {
    if(mark === "Email Marketing"){
      return 125;
    }
    else if(mark === "Social Media Marketing"){
      return 120;
    }
    else if(mark === "SMS Marketing"){
      return 50;
    }
  }
  // Function to replace placeholders in the email template
function replacePlaceholders(template:any, data:any) {
  for (const placeholder in data) {
    const regex = new RegExp(`\\[${placeholder}\\]`, 'g');
    template = template.replace(regex, data[placeholder]);
  }
  return template;
}

 // Ask OpenAI for a streaming completion given the prompt
 let content = ``;
 if(mark === "Email Marketing"){
  content = `Generate an email copy based on the following user input as context ${bio},
  Ensure that the email copy doesn't exceed ${limit_lines(mark)} characters and that it focuses on content related to the storage industry. The email is targeted at potential tenants interested in renting storage units. Response format should be in the format subject:[], email_body:[], image_tag_line:[] with line breaks in between each of the key value pairs. No customer greetings like hello and hi  in email_body`
  
 }
 if(mark === "Social Media Marketing"){
  content = `Generate an social media copy based on the following user input as context ${bio},
  Ensure that the  copy doesn't exceed ${limit_lines(mark)} characters and that it focuses on content related to the storage industry. The copy is targeted at potential tenants interested in renting storage units. Response format should be in the format give a catchy hashtag and some trendy hashtags.`
  
 }
 if(mark === " SMS Marketing"){
  content = `Generate an sms copy based on the following user input as context ${bio},
  Ensure that the sms copy doesn't exceed ${limit_lines(mark)} characters and that it focuses on content related to the storage industry.`
  
 }

 console.log(content)
 const response = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  stream: true,
  messages: [
    {
      role: 'user',
      content: content,
    },
  ],
});

  // Generate email content using OpenAI
// function generateEmailContent(template) {
//   openai.completions.create({
//     engine: 'text-davinci-002',
//     prompt: template,
//     max_tokens: 100,
//   })
//     .then((response) => {
//       const generatedContent = response.choices[0].text;

//       // You can save the generated content to a file or send it via email
//       fs.writeFileSync('generated_email.txt', generatedContent);

//       console.log('Email content generated successfully:');
//       console.log(generatedContent);
//     })
//     .catch((error) => {
//       console.error('Error generating email content:', error);
//     });
// }

// Replace placeholders with dynamic data


  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
