import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
//-data :
import data from './data';
function App() {
  //-hooks :
  const [people, setPeaple] = useState(data);
  const [index, setIndex] = useState(0);

  //HACK: functionality : part-2
  useEffect(() => {
    const lastIndex = people.length - 1;
    // effect :
    if (index < 0) {
      //!fixing the move left
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      //! fixing the move right
      setIndex(0);
    }
    return () => {
      // cleanup
    };
  }, [index, people]);

  //HACK: functionality : part-3
  useEffect(() => {
    // effect :
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);

    return () => {
      // cleanup
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span> reviews
        </h2>
        <div className="section-center">
          {people.map((person, personIndex) => {
            const { id, image, name, title, quote } = person;

            //HACK:  functionality : part-1
            let position = 'nextSlide';
            if (personIndex === index) {
              position = 'activeSlide';
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = 'lastSlide';
            }

            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}
          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>

          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
