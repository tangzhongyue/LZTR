package action;

import java.sql.Date;
import java.util.List;

import model.Questionnaire;
import service.QuestionnaireService;

public class QuestionnaireActions extends BaseAction{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private int userid;
	private String title;
	private String status;
	private int isPublic;
	private Date releaseTime;
	private Date endTime;
	private String condi;
	private QuestionnaireService quesService;

	public int getId(){
		return id;
	}
	public void setId(int id){
		this.id = id;
	}
	
	public int getUserid(){
		return userid;
	}
	public void setUserid(int userid){
		this.userid = userid;
	}
	
	public String getTitle(){
		return title;
	}
	public void setTitle(String title){
		this.title = title;
	}
	
	public String getStatus(){
		return status;
	}
	public void setStatus(String status){
		this.status = status;
	}
	
	public int getIsPublic(){
		return isPublic;
	}
	public void setIsPublic(int isPublic){
		this.isPublic = isPublic;
	}
	
	public Date getReleaseTime(){
		return releaseTime;
	}
	public void setReleaseTime(Date releaseTime){
		this.releaseTime = releaseTime;
	}
	
	public Date getEndTime(){
		return endTime;
	}
	public void setEndTime(Date endTime){
		this.endTime = endTime;
	}
	
	public void setCondi(String condi){
		this.condi = condi;
	}
	public String getCondi(){
		return this.condi;
	}

	public void setQuestionnaireService(QuestionnaireService quesService) {
		this.quesService = quesService;
	}
	
	public String add() throws Exception {
		if(status==null) status = "unp";
		Questionnaire ques = new Questionnaire(userid,title,status,isPublic,releaseTime,endTime);
		quesService.addQuestionnaire(ques);
		return "add";
	}
	 
	/* id and userid can not be changed */
	public String update() throws Exception {
		Questionnaire ques = quesService.getQuestionnaireById(id);
		ques.setEndTime(endTime);
		ques.setIsPublic(isPublic);
		ques.setReleaseTime(releaseTime);
		ques.setStatus(status);
		ques.setTitle(title);
		quesService.updateQuestionnaire(ques);
		return "update";
	}
	
	/* used by admin only for changing status */
	public String updateStatus() throws Exception {
		Questionnaire ques = quesService.getQuestionnaireById(id);
		ques.setStatus(status);
		quesService.updateQuestionnaire(ques);
		return "updateStatus";
	}
	
	public String delete() throws Exception {
		Questionnaire ques = quesService.getQuestionnaireById(id);
		quesService.deleteQuestionnaire(ques);
		return "delete";
	}
	
	public String all() throws Exception {
		List<Questionnaire> Questionnaires = quesService.getAllQuestionnaires();
		request().setAttribute("Questionnaires", Questionnaires);
		return "all";
	}
	
	public String search() throws Exception{
		List<Questionnaire> Questionnaires = quesService.findQuestionnaires(condi);
		request().setAttribute("ResultList", Questionnaires);
		return "search";
	}
	
	public String my() throws Exception{
		List<Questionnaire> Questionnaires = quesService.getQuestionnaireByUserId(userid);
		request().setAttribute("MyQuess", Questionnaires);
		return "my";
	}
}