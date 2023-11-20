import Posts from "./Posts";
const Timeline = () => {
    const posts = [{
        name: "DavidConselvan",
        username: "@davidmc",
        content: "Bitcoin will be between 40k and 50k By the year's end. Don't fear, don't worry. Victory belongs to those who believe in $BTC Bitcoin and #Crypto There will always be ups and downs, but there's no need to panic.The main direction is upward. $ETH Ethereum is preparing for a Santa rally, followed by Avax $AVAX Polygon $MATIC seems poised to soar. KASPA $KAS is becoming legendary, and $PEPE will continue to be popular.",
    },
    {
        name: "ThiagoVictoriano",
        username: "@thivic",
        content: "Tether Ventures Into #Bitcoin Mining: A Strategic Shift Beyond Stablecoins…  cryptowizard101.com/index.php?...$BTC",
    }]

    return(
        <div>
            {posts.map((post)=> {
                <Posts name = {post.name} username = {post.username} content = {post.content}></Posts>
                
            })}
        </div>
    )


}

export default Timeline;