import os # type: ignore
import shutil # type: ignore
from typing import Optional # type: ignore
from pydantic import BaseModel # type: ignore
from sqlalchemy.sql.expression import func # type: ignore
from sqlalchemy.orm import sessionmaker, Session # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from starlette.middleware.sessions import SessionMiddleware # type: ignore
from sqlalchemy import create_engine, Column, Integer, String, Boolean # type: ignore
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

# Soru modeli
class QuestionModel(Base):
    __tablename__ = "questions"

    soru_id = Column(Integer, primary_key=True, index=True)
    alan_bilgisi = Column(String, index=True)
    soru_dersi = Column(String, index=True)
    correct_answer = Column(String)
    image_file_name = Column(String)

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

class ScoreUpdate(BaseModel):
    total_question: int
    correct_answer: int
    wrong_answer: int
    score: int

class LoginUser(BaseModel):
    username: str
    password: str

class RegisterUser(LoginUser):
    name: str
    surname: str
    e_mail: str
    is_teacher: bool
    is_student: bool

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
    allow_origins=["http://localhost:5500","http://127.0.0.1:5500"],
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

# Dosya yükleme
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/upload_file")
async def upload_file(dosya_yukle: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Yeni bir ID almak için get_next_question_id fonksiyonunu çağır
        next_id_result = db.query(func.max(QuestionModel.soru_id)).scalar()
        next_id = (next_id_result or 0) + 1
        
        # Dosya adını oluştur
        file_extension = os.path.splitext(dosya_yukle.filename)[1]
        new_filename = f"question_{next_id}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, new_filename)
        
        # Dosyayı kaydet
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(dosya_yukle.file, buffer)
        
        return {"filename": new_filename, "message": "File uploaded successfully"}
    except Exception as e:
        return {"error": f"Dosya yükleme hatası: {str(e)}"}

# Kullanıcı kayıt
@app.post("/register/", response_model=RegisterUser)
def register_post(user: RegisterUser, db: Session = Depends(get_db)):
    db_question = db.query(UserModel).filter(UserModel.username == user.username).first()
    if db_question is not None:
        raise HTTPException(status_code=404, detail="Kullanıcı zaten var")
    db_question = UserModel(**user.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

# Kullanıcı giriş
@app.post("/login/", response_model=LoginUser)
def login_post(user: LoginUser, db: Session = Depends(get_db), response: Response = None):
    db_user = db.query(UserModel).filter(UserModel.username == user.username).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
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
    if user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    return user

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
    if db_user is None:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")
    
    db_user.total_question += score_update.total_question
    db_user.correct_answer += score_update.correct_answer
    db_user.wrong_answer += score_update.wrong_answer
    db_user.score += score_update.score
    
    db.commit()
    db.refresh(db_user)
    return {
        "message": "Kullanıcı istatistikleri başarıyla güncellendi",
        "new_stats": {
            "total_question": db_user.total_question,
            "correct_answer": db_user.correct_answer,
            "wrong_answer": db_user.wrong_answer,
            "score": db_user.score
        }
    }
    
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
    if question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
    return question

# Katekoriye göre soruları listeleme
@app.get("/questions/category/{soru_turu}")
def read_question(soru_turu: str, db: Session = Depends(get_db)):
    question = db.query(QuestionModel).filter(QuestionModel.soru_turu == soru_turu).all()
    if question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
    return question

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

@app.get("/questions/get_next_id/next_id")
async def get_next_question_id(db: Session = Depends(get_db)):
    try:
        next_id_result = db.query(func.max(QuestionModel.soru_id)).scalar()
        next_id = (next_id_result or 0) + 1
        
        return {"next_id": next_id}
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
@app.delete("/questions/{soru_id}")
def delete_question(soru_id: int, db: Session = Depends(get_db)):
    question = db.query(QuestionModel).filter(QuestionModel.soru_id == soru_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Soru bulunamadı")
    db.delete(question)
    db.commit()
    return {"message": "Soru başarıyla silindi"}

# Bütün soruları silme
@app.delete("/questions/delete_all/delete")
def delete_all_questions(db: Session = Depends(get_db)):
    questions = db.query(QuestionModel).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Hiçbir soru bulunamadı")
    
    try:
        for question in questions:
            db.delete(question)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Bir hata oluştu: {str(e)}")
    
    return {"message": "Tüm sorular başarıyla silindi"}