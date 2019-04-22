class ListItem extends React.Component {
  render() {
    return <li data-icon="image2">{this.props.item.name}</li>;
  }
}

class ListviewDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listImages: [
        { id: 1, name: "Image 1" },
        { id: 2, name: "Image 2" },
        { id: 3, name: "Image 3" },
        { id: 4, name: "Image 4" },
        { id: 5, name: "Image 5" }
      ],
      menuImages: [
        { id: 1, name: "My Image 1" },
        { id: 2, name: "My Image 2" },
        { id: 3, name: "My Image 3" },
        { id: 4, name: "My Image 4" },
        { id: 5, name: "My Image 5" }
      ]
    };
  }
  removeItem = index => {
    var newState = React.addons.update(this.state, {
      listImages: {
        $splice: [[index, 1]]
      }
    });
    this.setState(newState);
  };
  removeItem2 = index => {
    var newState = React.addons.update(this.state, {
      menuImages: {
        $splice: [[index, 1]]
      }
    });
    this.setState(newState);
  };
  stages = {
    left: [
      {
        percent: 25,
        icon: "link",
        text: "Get link",
        action: function(event, inst) {
          mobiscroll.toast({
            message: "Link copied"
          });
        }
      },
      {
        percent: 50,
        icon: "download",
        text: "Download",
        action: function(event, inst) {
          mobiscroll.toast({
            message: "Downloaded"
          });
        }
      }
    ],
    right: [
      {
        percent: -25,
        icon: "print",
        text: "Print",
        action: function(event, inst) {
          mobiscroll.toast({
            message: "Printing..."
          });
        }
      },
      {
        percent: -50,
        icon: "remove",
        text: "Delete",
        confirm: true,
        action: (event, inst) => {
          this.removeItem(event.index);
        }
      }
    ]
  };
  render() {
    var that = this;
    return (
      <mobiscroll.Form theme="material">
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>Action list</mobiscroll.FormGroupTitle>
          <mobiscroll.Listview
            theme="material"
            itemType={ListItem}
            data={this.state.listImages}
            enhance={true}
            stages={this.stages}
          />
        </mobiscroll.FormGroup>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>Action menu</mobiscroll.FormGroupTitle>
          <mobiscroll.Listview
            theme="material"
            itemType={ListItem}
            data={this.state.menuImages}
            enhance={true}
            actions={[
              {
                icon: "link",
                action: function(event, inst) {
                  mobiscroll.toast({
                    message: "Link copied"
                  });
                }
              },
              {
                icon: "star3",
                action: function(event, inst) {
                  mobiscroll.toast({
                    message: "Starred"
                  });
                }
              },
              {
                icon: "download",
                action: function(event, inst) {
                  mobiscroll.toast({
                    message: "Downloaded"
                  });
                }
              },
              {
                icon: "print",
                action: function(event, inst) {
                  mobiscroll.toast({
                    message: "Printing..."
                  });
                }
              },
              {
                icon: "remove",
                action: function(event, inst) {
                  that.removeItem2(event.index);
                }
              }
            ]}
          />
        </mobiscroll.FormGroup>
      </mobiscroll.Form>
    );
  }
}
