const SelectClients = (props) => {
  return (
    <div
      className="flex-container module bg-gray"
      data-frametype="informational"
      data-frameid={ props.frameId }
    >
      <div>
        <div className="select-clients-column">
          <p className="uppercase bold">
            Select Clients
          </p>
        </div>
      </div>
      <div>
        <div className="select-clients-column col">
          {
            props.content.selectClients.map( ({clientName, url}) => (
              <div
                className="client-name"
                key={ clientName }
              >
                { clientName }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SelectClients
