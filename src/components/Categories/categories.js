const Categories = (props) => {
  return (
    <div className={"container"}>
      <h2 className={"m-3"}>Book Categories:</h2>
      <table className={"table"}>
        <thead>
        <tr>
          <th scope={"col"}>#</th>
          <th scope={"col"}>Name</th>
        </tr>
        </thead>
        <tbody>
        {props.categories.map((category, index) => {
          return (
            <tr key={category}>
              <td>{index + 1}</td>
              <td>{category}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;