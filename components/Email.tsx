import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function EmailCopy({ content }: any) {
  
  const data:any = {};
  
  const regex = /^([\w\s]+):\s([\s\S]*?)(?=\n\w+:|$)/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    const value = match[2].trim();
    data[key] = value;
  }
  
  console.log(data);
  console.log(content); 

  return (
    //   <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border shadow-md">
    //   <div className="p-6">
    //     <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
    //      Email Copy
    //     </h5>
    //     <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
    //       {content}
    //     </p>
    //   </div>
    //   <div className="p-6 pt-0">
    //     <button
    //       className="select-none rounded-lg bg-black-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    //       type="button"
    //       data-ripple-light="true"
    //     disabled>
    //      Send Email
    //     </button>
    //   </div>
    // </div>
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900 shadow-lg">
      {/* <header>
        <a href="#">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/full-logo.svg" alt=""/>
        </a>
    </header> */}

      <main className="mt-3">
      <h2 className="text-gray-700 dark:text-gray-200">
      [Subject]: {data.subject}
        </h2>
        <h2 className="text-gray-700 dark:text-gray-200">
          Hi [Customer Name],
        </h2>
        <div className="relative max-w-xl mx-auto mt-3">
          <img
            className="h-64 w-full object-cover rounded-md"
            src="https://blog.rentaspace.com.au/hubfs/Imported_Blog_Media/rentaspace-gregory-hills-self-storage2-1.jpg"
            alt="Self Storage"
          />
          <div className="absolute inset-0 bg-gray-500 opacity-40 rounded-md"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">
           {data.image_tag_line}
            </h2>
          </div>
        </div>
        <p className="mt-3 leading-loose text-gray-600 dark:text-gray-300">
        {data.email_body}
   
        </p>
        {/* <a href="#">

            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/full-logo.svg" alt=""/>
        </a> */}
   
        <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Visit Website
        </button>

        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Thanks, <br />
     The Continental Storage
        </p>
      </main>

      <footer className="mt-8">
        <p className="text-gray-500 dark:text-gray-400">
          If you'd rather not receive this kind of email, you can{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            unsubscribe
          </a>
        </p>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}  Storage
        </p>
      </footer>
    </section>
  );
}
