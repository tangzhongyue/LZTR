package action;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;
import model.Answer;
import model.AnswerSheet;
import model.Questionnaire;
import model.User;
import service.AnswerSheetService;
import service.QuestionnaireService;
public class AnswerAction extends BaseAction{
	private AnswerSheetService ansService;
	private int id;
	private int quesid;
	private Date time;
	private String content;
	private QuestionnaireService quesService;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQuesid() {
		return quesid;
	}
	public void setQuesid(int quesid) {
		this.quesid = quesid;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public void setAnsService(AnswerSheetService ansService) {
		this.ansService = ansService;
	}
	public void setQuesService(QuestionnaireService quesService) {
		this.quesService = quesService;
	}
	/**
	 * Create a new answer sheet
	 * @return
	 * @throws IOException 
	 */
	public String add() throws IOException{
		if(content==""){response().getWriter().print("success");return null;}
		content =  URLDecoder.decode(content, "UTF-8");
		content =  URLDecoder.decode(content, "UTF-8");
		String ip = request().getRemoteAddr();
		Answer ans = new Answer(quesid, time, ip);
		int allowDup = quesService.getQuestionnaireById(quesid).getAllowDup();
		if(allowDup==0){
			if(ansService.getAnswersByIp(ip,quesid)!=null&&(!ansService.getAnswersByIp(ip,quesid).isEmpty())){
				response().getWriter().print("dupIp");
				return null;
			}
		}
		AnswerSheet anst  = new AnswerSheet(content);
		if(session().getAttribute("user") != null){
			User user = (User)session().getAttribute("user");
			anst.setUserid(user.getId());
		}
		ansService.addAnswer(ans, anst);
		response().getWriter().print("success");
		return null;
	}
	/**
	 * Update an answer sheet, requiring user logged
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String update() throws UnsupportedEncodingException{
		content =  URLDecoder.decode(content, "UTF-8");
		content =  URLDecoder.decode(content, "UTF-8");
		String ip = request().getRemoteAddr();
		Answer ans = ansService.getAnswerById(id);
		AnswerSheet anst = ansService.getAnswerSheetById(id);
		ans.setIp(ip);
		ans.setTime(time);
		anst.setContent(content);
		ansService.updateAnswer(ans, anst);
		return null;
	}
	/**
	 * Delete an answer with its id
	 * @return
	 */
	public String delete(){
		Answer ans = ansService.getAnswerById(id);
		AnswerSheet anst = ansService.getAnswerSheetById(id);
		ansService.deleteAnswer(ans, anst);
		return "delete";
	}
	/**
	 * Get all answers' information of a specific questionnaire
	 * @return
	 */
	public String getByQuesid(){
		List<Answer> anss = ansService.getAnswerByQuestion(quesid);
		request().setAttribute("answers", anss);
		Questionnaire ques = quesService.getQuestionnaireById(quesid);
		request().setAttribute("quesinfo", ques);
		return "getByQuesid";
	}
}
