package service.impl;

import java.util.List;

import dao.QuestionnaireDao;
import model.Questionnaire;
import service.QuestionnaireService;

public class QuestionnaireServiceImpl implements QuestionnaireService {
	
	private QuestionnaireDao quesDao;
	
	/* (non-Javadoc)
	 * @see service.impl.QuestionnaireService#setQuestionnaireDao(dao.QuestionnaireDao)
	 */
	@Override
	public void setQuestionnaireDao(QuestionnaireDao quesDao) {
		this.quesDao = quesDao;
	}
	
	/* (non-Javadoc)
	 * @see service.impl.QuestionnaireService#addQuestionnaire(model.Questionnaire)
	 */
	@Override
	public Integer addQuestionnaire(Questionnaire ques) {
		return quesDao.addQuestionnaire(ques);
	}

	/* (non-Javadoc)
	 * @see service.impl.QuestionnaireService#deleteQuestionnaire(model.Questionnaire)
	 */
	@Override
	public void deleteQuestionnaire(Questionnaire ques) {
		quesDao.deleteQuestionnaire(ques);
	}

	/* (non-Javadoc)
	 * @see service.impl.QuestionnaireService#updateQuestionnaire(model.Questionnaire)
	 */
	@Override
	public void updateQuestionnaire(Questionnaire ques) {
		quesDao.updateQuestionnaire(ques);
	}

	/* (non-Javadoc)
	 * @see service.impl.QuestionnaireService#getQuestionnaireById(int)
	 */
	@Override
	public Questionnaire getQuestionnaireById(int id) {
		return quesDao.getQuestionnaireById(id);
	}

	/* (non-Javadoc)
	 * @see service.impl.QuestionnaireService#getAllQuestionnaires()
	 */
	@Override
	public List<Questionnaire> getAllQuestionnaires() {
		return quesDao.getAllQuestionnaires();
	}
}
