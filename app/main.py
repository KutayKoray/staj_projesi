import os # type: ignore
import shutil # type: ignore
<<<<<<< HEAD
=======
from typing import List # type: ignore
>>>>>>> develop
from pydantic import BaseModel # type: ignore
from sqlalchemy.sql.expression import func # type: ignore
from sqlalchemy.orm import sessionmaker, Session # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from starlette.middleware.sessions import SessionMiddleware # type: ignore
<<<<<<< HEAD
from sqlalchemy import create_engine, Column, Integer, String, Boolean # type: ignore
=======
from sqlalchemy import create_engine, Column, Integer, String, Boolean, JSON # type: ignore
>>>>>>> develop
from fastapi import File, UploadFile # type: ignore
from fastapi.responses import Response # type: ignore
from fastapi.staticfiles import StaticFiles # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from fastapi import FastAPI, HTTPException, Depends # type: ignore

# Veritabanı bağlantısı ORM
SQLALCHEMY_DATABASE_URL = "sqlite:///./quiz.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

<<<<<<< HEAD
# Soru modeli
class QuestionModel(Base):
    __tablename__ = "questions"

    soru_id = Column(Integer, primary_key=True, index=True)
    alan_bilgisi = Column(String, index=True)
    soru_dersi = Column(String, index=True)
    correct_answer = Column(String)
    image_file_name = Column(String)

=======
>>>>>>> develop
# User Modeli
class UserModel(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String)
    name = Column(String)
    surname = Column(String)
    e_mail = Column(String)
    is_teacher = Column(Boolean, default=0)
    is_student = Column(Boolean, default=1)
    total_question = Column(Integer, default=0)
    correct_answer = Column(Integer, default=0)
    wrong_answer = Column(Integer, default=0)
    score = Column(Integer, default=0)
<<<<<<< HEAD
    # wrong_anwers listesi eklenebilir

class ScoreUpdate(BaseModel):
    total_question: int
    correct_answer: int
    wrong_answer: int
    score: int
=======
    wrong_questions = Column(JSON, default=[])
>>>>>>> develop

class LoginUser(BaseModel):
    username: str
    password: str

class RegisterUser(LoginUser):
    name: str
    surname: str
    e_mail: str
    is_teacher: bool
    is_student: bool

<<<<<<< HEAD
=======
class UpdateScore(BaseModel):
    total_question: int
    correct_answer: int
    wrong_answer: int
    score: int
    wrong_questions: List[int] = []

# Soru modeli
class QuestionModel(Base):
    __tablename__ = "questions"

    soru_id = Column(Integer, primary_key=True, index=True)
    alan_bilgisi = Column(String, index=True)
    soru_dersi = Column(String, index=True)
    correct_answer = Column(String)
    image_file_name = Column(String)

>>>>>>> develop
class QuestionSchema(BaseModel):
    alan_bilgisi: str
    soru_dersi: str
    correct_answer: str
    image_file_name: str

class QuestionUpdate(BaseModel):
    alan_bilgisi: str
    soru_dersi: str
    correct_answer: str
    image_file_name: str

# Veritabanı oluşturma
Base.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key="hdisigorta")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500","http://127.0.0.1:5500","http://localhost:5501","http://127.0.0.1:5501","http://localhost:8080","http://localhost:8000", "http://192.168.65.1:8080", "http://192.168.65.1", "http://0.0.0.0:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

<<<<<<< HEAD
=======
# Sağlık kontrolü
@app.get("/health")
def health_check():
    return {"status": "ok"}

>>>>>>> develop
# Dosya yükleme
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "app/uploads")

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

<<<<<<< HEAD
# app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/upload_file")
async def upload_file(dosya_yukle: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Yeni bir ID almak için get_next_question_id fonksiyonunu çağır
        next_id_result = db.query(func.max(QuestionModel.soru_id)).scalar()
        next_id = (next_id_result or 0) + 1
        
        # Dosya adını oluştur
=======
@app.post("/upload_file")
async def upload_file(dosya_yukle: UploadFile = File(...), db: Session = Depends(get_db)):
    
    try:
        next_id_result = db.query(func.max(QuestionModel.soru_id)).scalar()
        next_id = (next_id_result or 0) + 1
        
>>>>>>> develop
        file_extension = os.path.splitext(dosya_yukle.filename)[1]
        new_filename = f"question_{next_id}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, new_filename)
        
<<<<<<< HEAD
        # Dosyayı kaydet
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(dosya_yukle.file, buffer)
        
        return {"filename": new_filename, "message": "File uploaded successfully", "path": file_path}
=======
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(dosya_yukle.file, buffer)
        
        return {"filename": new_filename, "message": "File uploaded successfully"}
    
>>>>>>> develop
    except Exception as e:
        return {"error": f"Dosya yükleme hatası: {str(e)}"}

# Kullanıcı kayıt
@app.post("/register/", response_model=RegisterUser)
def register_post(user: RegisterUser, db: Session = Depends(get_db)):
    db_question = db.query(UserModel).filter(UserModel.username == user.username).first()
<<<<<<< HEAD
    if db_question is not None:
        raise HTTPException(status_code=404, detail="Kullanıcı zaten var")
=======

    if db_question is not None:
        raise HTTPException(status_code=404, detail="Kullanıcı zaten var")
    
>>>>>>> develop
    db_question = UserModel(**user.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

# Kullanıcı giriş
@app.post("/login/", response_model=LoginUser)
def login_post(user: LoginUser, db: Session = Depends(get_db), response: Response = None):
    db_user = db.query(UserModel).filter(UserModel.username == user.username).first()
<<<<<<< HEAD
    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
=======

    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
>>>>>>> develop
    if db_user.password != user.password:
        raise HTTPException(status_code=404, detail="Şifre hatalı")
    return db_user

# Kullanıcı listeleme
@app.get("/users/")
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(UserModel).offset(skip).limit(limit).all()
    return users

# Kullanıcı bilgilerini alma
@app.get("/users/{username}")
def read_user(username: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.username == username).first()
<<<<<<< HEAD
=======

>>>>>>> develop
    if user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    return user

<<<<<<< HEAD
@app.get("/scores")
def read_user_scores(db: Session = Depends(get_db)):
    users = db.query(UserModel).order_by(UserModel.score.desc()).all()
=======
# Kullanıcının yanlış yapılan sorularını gönderme
@app.get("/users/{username}/wrong_questions")
def get_wrong_questions(username: str, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    wrong_questions_ids = db_user.wrong_questions
    if not wrong_questions_ids:
        return {"message": "Yanlış yapılan soru bulunamadı"}
    
    wrong_questions = db.query(QuestionModel).filter(QuestionModel.soru_id.in_(wrong_questions_ids)).all()
    
    return wrong_questions

# Kullanıcı skorlarını bastırma
@app.get("/users/score")
def read_user_scores(db: Session = Depends(get_db)):
    users = db.query(UserModel).order_by(UserModel.score.desc()).all()

>>>>>>> develop
    if not users:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    return [{"username": user.username, "score": user.score} for user in users]

<<<<<<< HEAD
# Kullanıcı silme
@app.delete("/users/{username}")
def delete_user(username: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    db.delete(user)
    db.commit()
    return {"message": "Kullanıcı başarıyla silindi"}

# Veri tabanından kullanıcının scorunu güncelleme
@app.put("/users/{username}/score")
def update_user_score(username: str, score_update: ScoreUpdate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()
=======

# Veri tabanından kullanıcının scorunu güncelleme
@app.put("/users/{username}/score")
def update_user_score(username: str, score_update: UpdateScore, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()

>>>>>>> develop
    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    db_user.total_question += score_update.total_question
    db_user.correct_answer += score_update.correct_answer
    db_user.wrong_answer += score_update.wrong_answer
    db_user.score += score_update.score
<<<<<<< HEAD
    
=======

    if score_update.wrong_questions:
        db_user.wrong_questions = score_update.wrong_questions

>>>>>>> develop
    db.commit()
    db.refresh(db_user)
    return {
        "message": "Kullanıcı istatistikleri başarıyla güncellendi",
        "new_stats": {
            "total_question": db_user.total_question,
            "correct_answer": db_user.correct_answer,
            "wrong_answer": db_user.wrong_answer,
<<<<<<< HEAD
            "score": db_user.score
        }
    }
=======
            "score": db_user.score,
            "wrong_questions": db_user.wrong_questions
        }
    }

# Kullanıcı skorunu sıfırlama
@app.put("/users/{username}/reset_score")
def reset_user_score(username: str, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()

    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    db_user.total_question = 0
    db_user.correct_answer = 0
    db_user.wrong_answer = 0
    db_user.score = 0
    db_user.wrong_questions = []

    db.commit()
    db.refresh(db_user)

    return {
        "message": "Kullanıcı istatistikleri başarıyla sıfırlandı",
        "new_stats": {
            "total_question": db_user.total_question,
            "correct_answer": db_user.correct_answer,
            "wrong_answer": db_user.wrong_answer,
            "score": db_user.score,
            "wrong_questions": db_user.wrong_questions
        }
    }

# Bütün kullanıcı skorlarını sıfırlama
@app.put("/users/reset_all_score/reset_score")
def reset_all_user_scores(db: Session = Depends(get_db)):
    db_users = db.query(UserModel).all()

    if not db_users:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    for db_user in db_users:
        db_user.total_question = 0
        db_user.correct_answer = 0
        db_user.wrong_answer = 0
        db_user.score = 0
        db_user.wrong_questions = []

    db.commit()

    return {"message": "Tüm kullanıcıların istatistikleri başarıyla sıfırlandı"}

# Kullanıcı silme
@app.delete("/users/{username}/delete")
def delete_user(username: str, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.username == username).first()

    if user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    db.delete(user)
    db.commit()
    return {"message": "Kullanıcı başarıyla silindi"}

@app.delete("/users/delete_all/delete_users")
def delete_all_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()

    if not users:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    for user in users:
        db.delete(user)
    
    db.commit()
    return {"message": "Tüm kullanıcılar başarıyla silindi"}
>>>>>>> develop
    
# Soru ekleme
@app.post("/questions/", response_model=QuestionSchema)
def create_question(question: QuestionSchema, db: Session = Depends(get_db)):
    db_question = QuestionModel(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

# Tüm soruları listeleme
@app.get("/questions/")
def read_questions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    questions = db.query(QuestionModel).offset(skip).limit(limit).all()
    return questions

# Soruyu id üzerinde çağırma
@app.get("/questions/{soru_id}")
def read_question(soru_id: int, db: Session = Depends(get_db)):
    question = db.query(QuestionModel).filter(QuestionModel.soru_id == soru_id).first()
<<<<<<< HEAD
=======

>>>>>>> develop
    if question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
    return question

# Katekoriye göre soruları listeleme
@app.get("/questions/category/{soru_turu}")
def read_question(soru_turu: str, db: Session = Depends(get_db)):
    question = db.query(QuestionModel).filter(QuestionModel.soru_turu == soru_turu).all()
<<<<<<< HEAD
=======

>>>>>>> develop
    if question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
    return question

<<<<<<< HEAD
=======
# Katekoriye göre soruları gönderme
>>>>>>> develop
@app.get("/questions/category/{soru_dersi}/{soru_adedi}")
def read_questions(soru_dersi: str, soru_adedi: int, db: Session = Depends(get_db)):
    questions = (
        db.query(QuestionModel)
        .filter(QuestionModel.soru_dersi == soru_dersi)
        .order_by(func.random())
        .limit(soru_adedi)
        .all()
    )
    if not questions:
        raise HTTPException(status_code=404, detail="Sorular bulunamadı")
    return questions

<<<<<<< HEAD
=======
# Sonraki sorunun idsini gönderme
>>>>>>> develop
@app.get("/questions/get_next_id/next_id")
async def get_next_question_id(db: Session = Depends(get_db)):
    try:
        next_id_result = db.query(func.max(QuestionModel.soru_id)).scalar()
        next_id = (next_id_result or 0) + 1
<<<<<<< HEAD
        
        return {"next_id": next_id}
=======
        return {"next_id": next_id}
    
>>>>>>> develop
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Soru güncelleme
@app.put("/questions/{soru_id}", response_model=QuestionSchema)
def update_question(soru_id: int, question: QuestionUpdate, db: Session = Depends(get_db)):
    db_question = db.query(QuestionModel).filter(QuestionModel.soru_id == soru_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
    for var, value in vars(question).items():
        setattr(db_question, var, value) if value else None
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

# Soru silme
<<<<<<< HEAD
@app.delete("/questions/{soru_id}")
=======
@app.delete("/questions/{soru_id}/delete")
>>>>>>> develop
def delete_question(soru_id: int, db: Session = Depends(get_db)):
    question = db.query(QuestionModel).filter(QuestionModel.soru_id == soru_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
<<<<<<< HEAD
    db.delete(question)
    db.commit()
    return {"message": "Soru başarıyla silindi"}

# Bütün soruları silme
@app.delete("/questions/delete_all/delete")
=======
    
    try:
        file_extension = ".png"
        file_path = os.path.join(UPLOAD_DIR, f"question_{soru_id}{file_extension}")

        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            print(f"File not found: {file_path}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File deletion error: {str(e)}")
    
    try:
        db.delete(question)
        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    return {"message": "Soru ve dosya başarıyla silindi"}

# Bütün soruları silme
@app.delete("/questions/delete_all/delete_questions")
>>>>>>> develop
def delete_all_questions(db: Session = Depends(get_db)):
    questions = db.query(QuestionModel).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Hiçbir soru bulunamadı")
<<<<<<< HEAD
    
    try:
        for question in questions:
            db.delete(question)
        db.commit()
=======
    try:
        for question in questions:
            file_extension = ".png"
            file_path = os.path.join(UPLOAD_DIR, f"question_{question.soru_id}{file_extension}")

            if os.path.exists(file_path):
                os.remove(file_path)
            else:
                print(f"File not found: {file_path}")
            db.delete(question)
        db.commit()

>>>>>>> develop
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Bir hata oluştu: {str(e)}")
    
<<<<<<< HEAD
    return {"message": "Tüm sorular başarıyla silindi"}
=======
    return {"message": "Tüm sorular ve dosyalar başarıyla silindi"}
>>>>>>> develop
