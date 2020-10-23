import React, { Component, Fragment } from "react";

const channelsDataSource = require("../assets/data/channels.json");

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvGuideList: [],
      response: null,
      modalId: null,
      post: "",
      responseToPost: ""
    };
  }

  componentDidMount() {
    this.callApi("/api/hello")
      .then((res) => this.setState({ response: res.express }))
      .catch((err) => console.log(err));
  }

  callApi = async (url) => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  removeIframeFromDOM(index) {
    const iframe = document.getElementById("iframe_" + index);
    const divElm = document.getElementById("tvGuide_" + index);
    if (iframe) {
      iframe.remove();
    }
    if (divElm) {
      divElm.remove();
    }
  }
  createIframe(url, index) {
    let iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "400px";
    iframe.allowFullscreen = "allowfullscreen";
    iframe.id = `iframe_${index}`;
    iframe.sandbox =
      "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation";

    return iframe;
  }
  openPlayer(url, i) {
    document
      .getElementById("modal-body-" + i)
      .appendChild(this.createIframe(url, i));
  }
  openTVGuide(tvGuide, index) {
    document
      .getElementById("modal-body-" + index)
      .appendChild(this.createIframe(tvGuide, index));
  }

  createTVGuide(divElm, tvGuideItems) {
    tvGuideItems.pop()
    tvGuideItems.forEach(createItem);
    function createItem(item) {
      divElm.innerHTML += `<p>${item}</p>`;
    }
  }

  async appendGuideListToDialog(res, index) {
    //await this.setState({ tvGuideList: res.tvGuideList })
    // this.setState(prevState => {
    //   return {
    //     ...prevState.tvGuideList,
    //     tvGuideList: res.tvGuideList
    //   };
    // });
    
    const tvGuideList = res.tvGuideList
    await new Promise(resolve => {
      this.setState({ tvGuideList: ["one", "two"] }, () => resolve())
      console.log(this.state.tvGuideList)
    })
    
    
    let divElm = document.createElement("div");
    divElm.setAttribute("class", "tvGuide");
    divElm.id = `tvGuide_${index}`;
  
    this.createTVGuide(divElm, this.state.tvGuideList);
    this.setState({modalId: index})
    document.getElementById('modal-body-' + index).appendChild(divElm);
  }

  /* 
  setState doesn't update the state immediately
  https://stackoverflow.com/questions/41278385/setstate-doesnt-update-the-state-immediately
  https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/
  
  */
  async showTVGuide(url, index) {
    await this.callApi(`/api/channels/${index}`)
      .then((res) => {
        //this.setState(state => ({ ...state, tvGuideList: res.tvGuideList }));
        this.setState({ tvGuideList: res.tvGuideList }, () => {                              
          //callback
          console.log(res.tvGuideList)
        });

        // if (res.tvGuideList.length > 0) {
        //   this.appendGuideListToDialog(res, index)
        // }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const channel = channelsDataSource.map((item, i) => {
      return (
        <div className="col-2 m-1 p-2 bg-light border text-center" key={i}>
          <p>{this.state.response}</p>
          <h5>{item.name}</h5>
          <img src={item.logo} alt="" className="pb-2 tv-logo" />
          <button
            onClick={() => this.openPlayer(item.url, i)}
            type="button"
            className="btn bg-primary w-100 font-weight-bold"
            data-toggle="modal"
            data-target={`#modal_${i}`}
          >
            Open <ion-icon name="arrow-redo-circle-outline"></ion-icon>
          </button>
          <button
            onClick={() => this.openTVGuide(item.tvGuide, i)}
            type="button"
            className="btn bg-info w-100 font-weight-bold mt-1"
            data-toggle="modal"
            data-target={`#modal_${i}`}
          >
            Open TV Guide <ion-icon name="reader-outline"></ion-icon>
          </button>
          <button
            onClick={() => this.showTVGuide(item.tvGuide, i)}
            type="button"
            className="btn bg-warning w-100 font-weight-bold mt-1"
            data-toggle="modal"
            data-target={`#modal_${i}`}
          >
            SHow TV Guide in Popup <ion-icon name="reader-outline"></ion-icon>
          </button>
          <div className="text-uppercase w-100">{item.type}</div>

          {/** Dialog */}
          <div
            className="modal fade"
            id={`modal_${i}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {item.name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.removeIframeFromDOM(i)}
                  >
                    <ion-icon name="close-circle-outline"></ion-icon>
                  </button>
                </div>
                <div className="modal-body" id={`modal-body-${i}`}></div>
              </div>
            </div>
          </div>
          {/** End */}
        </div>
      );
    });
    return (
      <Fragment>
        <div
          className="
        container-fluid bg-light"
        >
          <div className="row channels">
            <h1>Channels</h1>
          </div>
          <div className="row channels">{channel}</div>
        </div>
      </Fragment>
    );
  }
}

export default Channels;
