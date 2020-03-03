import React from "react";
import styled from "styled-components";
// import logo from "../style.lib/images/icons8-location-80.png"
import logo from "../style.lib/images/flying_seagull_552368.jpg";
// import logo from "../style.lib/images/flying_seagull_300200.jpg";
// import logo_small from "../style.lib/images/flying_seagull_200133.jpg"

// const logo = "../style.lib/images/flying_seagull_513929.jpg";
const logo_small = "../style.lib/images/flying_seagull_200133.jpg";
const logo_medium = "../style.lib/images/flying_seagull_300200.jpg";
const src_set = `${logo_small} 1x, ${logo_medium} 2x`;

console.log("src_set", src_set);
console.log("logo", logo);

const HomePage = () => {
  return (
    <Box>
      <Title>Welcome location seekers!</Title>
      <Image src={logo} srcset={src_set} alt="Loading..." />

      {/*         
      <Image src={logo}
        srcset="{logo_small} 1x, {logo_small} 2x"
        alt="Loading..." /> */}
      {/* <Image src="https://robohash.org/etaperiamqui.jpg?size=300x300&set=set1"
        srcset="https://robohash.org/etaperiamqui.jpg?size=100x100&set=set1 1x, https://robohash.org/etaperiamqui.jpg?size=200x200&set=set1 2x"
        alt="Loading..."
      /> */}
    </Box>
  );
};
//     {/* src="https://robohash.org/eadoloresiste.jpg?size=80x80\u0026set=set1" /> */}

export default HomePage;

const Box = styled.div`
  font-size: 3rem;
  font-weight: normal;
  font-family: "Griffy", cursive;
  /* padding: 2rem 2.8rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 20rem;
  /* height: 30rem; */
  width: 30rem;

  background-color: thistle;
  transition: box-shadow 150ms, margin 150ms, padding 150ms;
  background: linear-gradient(to bottom, #f5f5dc 0%, thistle 100%);
  border-radius: 50%;
  margin-top: 2rem;
  border: dotted mediumvioletred 2px;
`;

const Image2 = styled.img`
  background: thistle;
  background: linear-gradient(to bottom, #f5f5dc 0%, thistle 100%);
  border-radius: 50%;
  margin-top: 2rem;
  border: dotted mediumvioletred 2px;
`;

// https://css-tricks.com/how-to-do-knockout-text/
// hiding" the text in a browser that can do the clipping.
const Title = styled.h1`
  /* font-family: "Expletus Sans"; */
  /* text-align: left; */
  font-size: 7rem;
  text-shadow: 2px 2px 10px rgba(71, 0, 37, 0.2);
  color: coral;
  padding-left: 1rem;
  background: -webkit-linear-gradient(gold, coral);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
