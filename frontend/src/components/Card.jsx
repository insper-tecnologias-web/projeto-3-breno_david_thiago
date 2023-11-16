const Card = (props) => {
    return (
        <div className = ' grow ml-7 mt-10 mr-4 mx-0.5 md:mx-36 min-w-fit max-w-screen-md rounded-xl border border-solid border-blue-500 p-2.5 md:p-11 border-2'>
            <h1 className = ' font-mono font-extrabold font-black text-xl md:text-4xl'>Market Data in Real Time</h1>
            <div className = 'flex flex-row justify-start'>
                <div className="flex flex-col mr-9 mt-5">
                    <h1 className = 'text-black text-lg md:text-2xl font-bold' >Total Market Cap</h1>
                    <h1 className = 'text-black text-md md:text-xl font-semibold'>{props.totalMarketCap}</h1>
                </div>
                <div className="flex flex-col mt-5">
                    <h1 className = 'text-black font-bold text-lg md:text-2xl'>Volume(24h)</h1>
                    <h1 className = 'text-black font-semibold text-md md:text-xl'>{props.total24Volume}</h1>
                </div>
            </div>
        </div>
    )
}

export default Card