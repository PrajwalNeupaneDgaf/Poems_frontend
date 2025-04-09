import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import Cover from "../Components/Cover";
import Title from "../Components/Title";
import Poems from "../Components/Poems";
import api from "../api";
import LoadingHome from "../Components/LoadingHome";

const Book = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [Book, setBook] = useState([]);
  const [User, setUser] = useState({});
  const [Pages, setPages] = useState([]);
  const [Titles, setTitles] = useState([])

  const bookRef = useRef()

  const [Loading, setLoading] = useState(true);

  const obj = {};

  useEffect(() => {
    api
      .get(`/poem/book/${uid}`)
      .then((res) => {
        setBook(res.data.poems);
        setUser(res.data.user);
        let ans = managePoems(res.data.poems);
        setPages(ans);
        console.log(res.data.poems);
      })
      .catch((error) => {
        // navigate('/')
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const managePoems = (poems) => {
    let pagesBook = [];
    let noOfStanza = 2
    let TitlesData = []
    let startPage = 3+  Math.ceil(poems?.length / 14)
    poems.map((itm) => {
      let count = Math.ceil(itm.stanzaCount / noOfStanza);
      TitlesData.push({
        title:itm.title,
        page:startPage,
        takenPage:count
      })
      startPage = startPage+count
      for (let i = 0; i < count; i++) {
        pagesBook.push({
          Title: itm.title,
          stanzas: itm.stanzas.slice(i * noOfStanza, i * noOfStanza + noOfStanza),
        });
      }
    });
    setTitles(TitlesData)
    return pagesBook;
  };

  const goToPage = (pageNumber) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flip(pageNumber);
    }
  };


  if (Loading) return <LoadingHome />;

  return (
    <div>
      <div className="px-4 py-4 flex items-center text-sm md:px-8 mb-2 absolute top-0 left-0 right-0 z-40 bg-gray-50">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="text-black font-semibold cursor-pointer text-[1rem]  select-none mx-1"
        >
          Home
        </span>
        <span
          onClick={() => {
            navigate(-1);
          }}
          className="cursor-pointer font-semibold"
        >
          ›Book
        </span>
        /{uid}
      </div>
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-950 px-4">
        <HTMLFlipBook
          ref={bookRef}
          width={350}
          height={500}
          size="fixed"
          minWidth={280}
          maxWidth={600}
          minHeight={400}
          maxHeight={800}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-2xl rounded-md"
        >
          <div>
            <Cover user={User} />
          </div>
          {Array.from({ length: Math.ceil(Book?.length / 14) })
            .fill("")
            .map((itm, idx) => {
              return (
                <div key={itm._id} id={idx} className="bg-white">
                  <Title
                    goToPage={goToPage}
                    pageNo={idx}
                    items={Titles?.slice(idx * 14, idx * 14 + 14)}
                  />
                </div>
              );
            })}
          {Pages?.map((itm, idx) => {
            return (
              <div key={idx}>
                <Poems data={itm} page={idx} />
              </div>
            );
          })}
          <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 flex items-center justify-center">
            {/* Initial letter */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold text-white drop-shadow-lg tracking-wide">
              END
            </div>

            {/* Author name */}
            <div className="absolute bottom-10 text-white text-lg font-light tracking-widest italic">
              <span className="font-medium not-italic">@{User?.username}</span>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Book;
