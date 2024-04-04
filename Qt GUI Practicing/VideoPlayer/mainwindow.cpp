#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "QFileDialog"
#include "qdebug.h""
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    Player = new QMediaPlayer();
    audioOutput = new QAudioOutput;
    Player->setAudioOutput(audioOutput);

    ui->pushButton_Play_paused->setIcon(style()->standardIcon(QStyle::SP_MediaPlay));
    ui->pushButton_Stop->setIcon(style()->standardIcon(QStyle::SP_MediaStop));
    ui->pushButton_seek_BackWard->setIcon(style()->standardIcon(QStyle::SP_MediaSkipBackward));
    ui->pushButton_Seek_forward->setIcon(style()->standardIcon(QStyle::SP_MediaSeekForward));
    ui->pushButton_Volume->setIcon(style()->standardIcon(QStyle::SP_MediaVolume));

    ui->horizontalSlider_Volume->setMinimum(0);
    ui->horizontalSlider_Volume->setMaximum(30);
      ui->horizontalSlider_Volume->setValue(30);

    audioOutput->setVolume(ui->horizontalSlider_Volume->value());

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_actionOpen_triggered()
{
    //tr("Select Vedio File") , "" , tr("mp4 files (.mp4)")
    QString FileName = QFileDialog::getOpenFileName(this, "open");

    qDebug ()<< "File name: " << FileName;
    Video = new QVideoWidget();

    Video->setGeometry(5 , 5 , ui->groupBox_Vedio->width() - 10 , ui->groupBox_Vedio->height() - 10);
    Video->setParent(ui->groupBox_Vedio);

    Player->setVideoOutput(Video);
    Player->setSource(QUrl::fromLocalFile(FileName));



    Video->setVisible(true);
    Video->show();
}


void MainWindow::on_horizontalSlider_Duration_valueChanged(int value)
{
   // Player->
   // Player->durationChanged();
}





void MainWindow::on_pushButton_seek_BackWard_clicked()
{

}


void MainWindow::on_pushButton_Seek_forward_clicked()
{

}


void MainWindow::on_horizontalSlider_Volume_valueChanged(int value)
{

   audioOutput->setVolume(value);
}
void MainWindow::on_pushButton_Volume_clicked()
{
    if(is_muted == false)
    {
        is_muted = true;
         ui->pushButton_Volume->setIcon(style()->standardIcon(QStyle::SP_MediaVolumeMuted));
     //   Player->hasAudio() = false;
           audioOutput->setMuted(true);


    }else{
         is_muted = false;
         ui->pushButton_Volume->setIcon(style()->standardIcon(QStyle::SP_MediaVolume));
              audioOutput->setMuted(false);
    }
}




void MainWindow::on_pushButton_Play_paused_clicked()
{
    if(is_Paused)
    {
         is_Paused = false;
        Player->play();
             ui->pushButton_Play_paused->setIcon(style()->standardIcon(QStyle::SP_MediaPause));
    }else
    {
        is_Paused = true;
         Player->stop();
            ui->pushButton_Play_paused->setIcon(style()->standardIcon(QStyle::SP_MediaPlay));
    }
}


void MainWindow::on_pushButton_Stop_clicked()
{
    Player->stop();
}

