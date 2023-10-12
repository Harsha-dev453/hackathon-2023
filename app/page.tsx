"use client";

import { useRef, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import DropDownMark, { MarkType } from "../components/DropDownMarkTypes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useChat } from "ai/react";
import EmailCopy from "../components/Email";
import FlyerAd from "../components/FlyerAd";
import SocialMediaBlogCard from "../components/SocialMediaBlogCard";
import Sms from "../components/SmsCard";
// const { predict } = require('./discountGen/discountGen');

export default function Page() {
  const [bio, setBio] = useState("");
  const [mark, setMark] = useState<MarkType>("Email Marketing");
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  function render_market_type(input:string,content:string) {
  
    switch (input) {
      case 'Email Marketing':
        return <EmailCopy content={content} />;
      
      case 'Social Media Marketing':
         return <SocialMediaBlogCard content={content} />;

      case 'WebSite Marketing':
        return <FlyerAd content={content} />; 

      case 'SMS Marketing':
         return <Sms content={content} />;
     
      default:
        return <div>Error: Invalid Campaign</div>;
    }
  }
  


  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        bio,
        mark,
      },
      onResponse() {
        scrollToBios();
      },
    });

  const onSubmit = (e: any) => {
    console.log("the",input)
    setBio(input);
    handleSubmit(e);
  };

  useEffect(() => {
    const ele = document.getElementById('recommended_discount_id');
    if (ele) {
      ele.innerHTML = "Recommended Discount %:";
    }
  }, [mark]);

  // async function getRecommendedDiscount(){}

  
  const lastMessage = messages[messages.length - 1];
  let generatedBios = lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <div>
    <div className="flex mx-auto flex-col items-center justify-center py-2">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center text-center px-4 mt-5 sm:mt-10">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next Marketing Campaign
        </h1>
        {/* <p className="text-slate-500 mt-5">47,118 bios generated so far.</p> */}
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
        
        <div className="flex mb-5 items-center space-x-3">
            {/* <Image src="/2-black.png" width={30} height={30} alt="1 icon" /> */}
            <p className="text-left font-bold"> Marketing Type</p>
          </div>
          <div className="block">
            <DropDownMark mark={mark} setMark={(newMark) => {setMark(newMark) } } />
          </div>
       
          <div className="flex mt-10 items-center space-x-3">
          
            <p className="text-left font-medium">
              Write few sentences to describe the content.
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "eg: Create a marketing campaign for reduced rents on your Unit"
            }
          />
      
      <br />
          <div className="flex mb-2 items-center space-x-3">
            <p className="text-left font-medium">Discount Percentage</p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={1}
            className="w-full rounded-md border-gray-100 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "please give your discount percentage or follow the recommendation"
            }
          />
          <p className="text-left font-medium" id="recommended_discount_id"> </p>
         

          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              type="submit"
            >
              Generate your Campaign &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
              </span>
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

      </main>
    </div>
    <main className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12 sm:mt-20">
    <output >
    {generatedBios && (
      render_market_type(mark,generatedBios)
     
    )}
        </output>
        </main>
        {/* <Footer /> */}
    </div>
  );
}


