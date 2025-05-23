export default function PageTitle({Title, SubeTitle}){
    return (
        <div style={{ marginTop: "5px" }}>
          <h1 style={{ textAlign: 'left', color: "white"}}>{Title}:</h1>
          <h3 style={{ textAlign: 'left', color: '#c9c1c1'}}>{SubeTitle}</h3>
        </div>
    )
}