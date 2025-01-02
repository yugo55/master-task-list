export default function TodoHeader(props: { month: string }) {
  return (
    <div className="bg-[#37555e] rounded p-2 shadow-lg mb-3">
      <p className="text-center font-bold text-xl text-white">
        {props.month}月
      </p>
      <div className="flex items-center">
        <span className="bg-[#d4f0f9] grid items-center w-12 h-12 text-center rounded-full mr-2">
          90%
        </span>
        <div className="w-[80%] h-2 bg-[#d4f0f9] rounded-full">
          <span className="block w-[90%] h-2 bg-blue-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
