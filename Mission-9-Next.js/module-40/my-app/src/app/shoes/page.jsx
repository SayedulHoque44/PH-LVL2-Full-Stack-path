const ShoePage = async () => {
  // 1.{cache:"force-cache"} --> using this when build the featch will be applied in the html and it will generate static web page in fetch by default value is cache value is "force-cache"
  // 2. {cache:"no-cache"} --> cache will not apply
  // 3. {next:{revalidate:5}} --> after 5 sec this page will be regenerate in ssr in the server, every time it will rebuild the index.html,
  // 4. {cache:"no-store"}  means when local build it will dynamic route it will not generate in index.html file. will be ssr dynamic
  const res = await fetch("http://localhost:5000/shoes", {
    cache: "no-store",
  });
  const result = await res.json();

  return (
    <div>
      <h1>This is Show page 2</h1>
      <div className="p-10 flex gap-2">
        {result.map((shoe) => (
          <div
            key={shoe.id}
            className="p-2 bg-green-500 text-white font-semibold"
          >
            <h1>{shoe.name}</h1>
            <p>{shoe.brand}</p>
            <h4>{shoe.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoePage;
