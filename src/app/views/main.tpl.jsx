export function render(data) {
    var header = data.conditional ? <div /> : 'null';
    var collection = data.items.map((item) => {
        return <li key={item.id} className={item.className}>{item.name}</li>;
    });

    return (<div id="container">
        {header}
        <ul>{collection}</ul>
        <p {...data.props}>Some features</p>
</div>);
}