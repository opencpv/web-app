interface AdBannerCardProps{
	ad:{
		image:string;
		title:string;
		sponsor:string;
		description:string;
		link:string;
	}
}

const AdBannerCard = ({ad}:AdBannerCardProps) =>{
	return <>
		  <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 h-48 md:h-64">
                <img
                  src={featuredAd.image}
                  alt={featuredAd.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold bg-black/20 text-white px-2 py-1 rounded">
                    SPONSORED
                  </span>
                  <span className="text-sm text-white">
                    {featuredAd.sponsor}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {featuredAd.title}
                </h3>
                <p className="text-white/90 mb-6">{featuredAd.description}</p>
                <a
                  href={featuredAd.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-zinc-800 transition duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
	</>
}

export default AdBannerCard;