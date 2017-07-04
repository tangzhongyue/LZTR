package service;

import java.util.List;

import dao.QuestionnaireDao;
import model.Questionnaire;

public interface QuestionnaireService {

	void setQuestionnaireDao(QuestionnaireDao quesDao);

	Integer addQuestionnaire(Questionnaire ques);

	void deleteQuestionnaire(Questionnaire ques);

	void updateQuestionnaire(Questionnaire ques);

	Questionnaire getQuestionnaireById(int id);

	List<Questionnaire> getAllQuestionnaires();

}
