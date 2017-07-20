package action;

import java.util.List;

import model.Answer;
import model.AnswerSheet;
import model.QuestionnaireQuestions;
import service.AnswerSheetService;
import service.QuestionnaireService;
import service.StatisticService;
/**
 * Action for statistic
 * @author LZTR
 *
 */
public class StatisticAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	private int quesid;
	private int id;
	private StatisticService statisticService;
	private AnswerSheetService ansService;
	private QuestionnaireService quesService;
	
	public int getQuesid() {
		return quesid;
	}
	public void setQuesid(int quesid) {
		this.quesid = quesid;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setStatisticService(StatisticService statisticService) {
		this.statisticService = statisticService;
	}
	public void setAnsService(AnswerSheetService ansService) {
		this.ansService = ansService;
	}
	public void setQuesService(QuestionnaireService quesService) {
		this.quesService = quesService;
	}
	/**
	 * Get a specific answer with its information and content, along with the information and
	 * the content of the questionnaire it related to
	 * @return
	 */
	public String getQuesAndAns(){
		QuestionnaireQuestions ques = quesService.getQuestionnaireQuestionsById(quesid);
		AnswerSheet anst = ansService.getAnswerSheetById(id);
		return null;
	}
	
	/**
	 * Get all answers of a specific questionnaire
	 * @return
	 */
	public String getAns(){
		List<AnswerSheet> ansts = statisticService.getAnssheetsByQuesid(quesid);
		return null;
	}
}