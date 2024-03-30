import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import {getRandomEmoji} from '../../utils/emojis.js'

const Conversations = () => {
	const {loading, conversations} = useGetConversations();
	console.log("9999", conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>

			{conversations.map((conversation, idx) => {
			return	<Conversation 
				key={conversation._id}
				conversation={conversation}
				emojis={getRandomEmoji()}
				lastIdx={idx === conversation.length -1}
				/>
			})}

			{loading ? <span className="loading loading-spinner mx-auto"></span>: null}
		</div>
	);
};
export default Conversations;