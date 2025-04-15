import React from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { parseMathMLToTree } from '../Utils/Utils';

class CirclePackingMathML extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomedId: null,
            profondeurNode: 0
        };
    }

    handleClick = (node) => {
      setTimeout(() => {
        console.log("haha");
        const mathElements = document.getElementsByTagName("foreignObject");
        const mathElements2 = mathElements;

        console.log(mathElements2);

        for (let i = 0; i < mathElements2.length; i++){
          console.log(mathElements[i]);
        }

        console.log(mathElements2.lenght);
        
        for (let i = 0; i < mathElements2.length; i++){
          console.log("iteration");
          mathElements[0].remove();
        }

        for (let i = 0; i < mathElements2.length; i++){
          console.log(mathElements[i]);
        }

        console.log("éléments supprimés");
      }, 500);

      this.setState((prevState) => ({
          zoomedId: prevState.zoomedId === node.id ? null : node.id,
          profondeurNode: prevState.zoomedId === node.id ? 0 : node.depth
      }));
    }

    filterLabels = (label) => {
        const { profondeurNode } = this.state;
        return label.node.depth < 2 + profondeurNode && label.node.depth >= profondeurNode;
    }


    stringToMathMLInHTML(mathMLString) {
      const parser = new DOMParser();
      const mathDoc = parser.parseFromString(mathMLString, "application/xml");
      const mathElement = mathDoc.documentElement;
    
      const wrapper = document.createElement("div");
      wrapper.appendChild(mathElement);
    
      return wrapper;
    }
    

    componentDidMount(){
      console.log("huhu");
      setTimeout(() => {
        const textElements = document.getElementsByTagName("text");
        for (let i = 0; i < textElements.length; i++){
          const mathMLString = textElements[i].textContent;
          const position = textElements[i].getBoundingClientRect();

          // Crée un fragment DOM à partir du string MathML
          const parser = new DOMParser();
          const mathDoc = parser.parseFromString(mathMLString, "application/xml");
          const mathElement = mathDoc.documentElement;
          
          // Créer un conteneur HTML pour le MathML
          const SVG_NS = "http://www.w3.org/2000/svg";
          const container = document.createElementNS(SVG_NS, "foreignObject");
          container.setAttribute("width", 200);
          container.setAttribute("height", 100);
          
          // Créer un point SVG, définir les coordonnées et le transformer vers des coordonnées SVG
          const svg = document.querySelector("svg");
          const pt = svg.createSVGPoint();
          pt.x = position.left + position.width / 2 - 100;
          pt.y = position.top + position.height/2 - 41;
          const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
      
          container.setAttribute("x", svgPt.x);
          container.setAttribute("y", svgPt.y);
          container.appendChild(mathElement);

          // Remplace la balise <text> par le MathML dans le DOM
          textElements[i].replaceWith(container);
        }

      }, 500);

    }



    // componentDidUpdate(){

    //   console.log("hihihihihi");

    //   setTimeout(() => {
    //     const textElements = document.getElementsByTagName("text");
    //     const textElements2 = textElements;

    //     for (let i = 0; i < textElements2.length; i++){
    //       console.log(textElements2[i]);
    //     }
    //     for (let i = 0; i < textElements.length; i++){
    //       console.log("Balise text modifiée : ")
    //       const mathMLString = textElements[i].textContent;
    //       const position = textElements[i].getBoundingClientRect();
          

    //       // Crée un fragment DOM à partir du string MathML
    //       const parser = new DOMParser();
    //       const mathDoc = parser.parseFromString(mathMLString, "application/xml");
    //       const mathElement = mathDoc.documentElement;

    //       console.log(mathElement);
          
    //       // Créer un conteneur HTML pour le MathML
    //       const SVG_NS = "http://www.w3.org/2000/svg";
    //       const container = document.createElementNS(SVG_NS, "foreignObject");
    //       container.setAttribute("width", 200);
    //       container.setAttribute("height", 100);
          
    //       // Créer un point SVG, définir les coordonnées et le transformer vers des coordonnées SVG
    //       const svg = document.querySelector("svg");
    //       const pt = svg.createSVGPoint();
    //       pt.x = position.left + position.width / 2 - 100;
    //       pt.y = position.top + position.height/2 - 41;
    //       const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
      
    //       container.setAttribute("x", svgPt.x);
    //       container.setAttribute("y", svgPt.y);
    //       container.appendChild(mathElement);

    //       // Remplace la balise <text> par le MathML dans le DOM
    //       textElements[i].replaceWith(container);
    //     }
    //     console.log("je suis ici");
    //   }, 500);

      

    // }

      // Array.from(textElements).forEach((textEl) => {
      //   console.log("po,ionubyvtyc");
      //   const mathMLString = textEl.textContent;

      //   // Crée un fragment DOM à partir du string MathML
      //   const parser = new DOMParser();
      //   const mathDoc = parser.parseFromString(mathMLString, "application/xml");
      //   const mathElement = mathDoc.documentElement;

      //   // Remplace la balise <text> par le MathML dans le DOM
      //   textEl.replaceWith(mathElement);
      // });
    

    render() {
        const { mathml } = this.props;
        const data = parseMathMLToTree(mathml);
        const { zoomedId } = this.state;

        return (
            <div style={{ height: 400 }}>
                <ResponsiveCirclePacking
                    data={data}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    id="name"
                    value="value"
                    colors={{ scheme: 'nivo' }}
                    childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
                    padding={4}
                    enableLabels={true}
                    labelsSkipRadius={10}
                    labelsFilter={this.filterLabels}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
                    zoomedId={zoomedId}
                    onClick={this.handleClick}
                    motionConfig="slow"
                />
            </div>
        );
    }
}

export default CirclePackingMathML;