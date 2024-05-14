import flow from '../Assets/image/flow.jpg'
import img3 from '../Assets/image/img3.jpg'
import dots from '../Assets/image/dots.jpg'
import strip from '../Assets/image/strips.jpg'
export function DesignCatalogueWise_pie(name) {
    const option = {
        legend: {
            show: true,
            position:'bottom'
          },
          chart: {
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 100
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 300
              }
          },
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
    
            },
            width: 380,
            type: 'pie',
            // dropShadow: {
            //   enabled: false,
            //   color: '#111',
            //   top: 0,
            //   left: 0,
            //   blur: 0,
            //   opacity: 0
            // }
          },
          stroke: {
            width: 0,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  total: {
                    showAlways: true,
                    show: true
                  }
                }
              }
            }
          },
          labels: name,
          dataLabels: {
            dropShadow: {
              blur: 0,
              opacity: 0
            }
          },
          fill: {
            image: {
              src: [dots, img3, flow, strip],
              width: 25,
              imagedHeight: 25
            },
            type: 'image',
            opacity: 1,
            pattern: {
              enabled: false,
            },
          },
          // states: {
          //   hover: {
          //     filter: 'none'
          //   }
          // },
          theme: {
            palette: 'none'
          },
    }
    return option;
}