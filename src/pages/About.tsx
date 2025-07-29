export const About = () => {
  return (
    <div className="p-4 text-center bg-orange-50 w-full h-screen">
      <h2 className="text-2xl font-bold mb-2 w-lg m-auto">About</h2>
      <p className="w-lg m-auto">
        Aloha! I`m Denis, 27 years old, from frosty Omsk in Russia. I enjoy
        spending time with my pets—a Labrador and a Maine Coon—and coding. But
        what I truly love is solving various challenges, which is exactly why I
        ended up here. The course was both valuable and exciting, and the final
        team challenge was incredibly engaging and addictive, thanks to our team
        dynamic and the guidance of our amazing mentor. By the end of the
        course, I can confidently say that my passion for development has
        deepened significantly.
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="m-auto flex bg-[url('../../public/rss.svg')] bg-cover bg-center h-20 w-60 items-center justify-center fill-red-200 mt-10 hover:opacity-60 transition duration-200"
      ></a>
    </div>
  );
};
