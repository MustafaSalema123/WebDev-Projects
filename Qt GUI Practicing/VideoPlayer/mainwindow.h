#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtMultimedia>
#include <QAudioOutput>
#include <QtMultimediaWidgets>
#include <QtCore>
#include <QtWidgets>
#include <QtGui>

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_actionOpen_triggered();

    void on_horizontalSlider_Duration_valueChanged(int value);





    void on_pushButton_seek_BackWard_clicked();

    void on_pushButton_Seek_forward_clicked();

    void on_pushButton_Volume_clicked();

    void on_horizontalSlider_Volume_valueChanged(int value);

    void on_pushButton_Play_paused_clicked();

    void on_pushButton_Stop_clicked();

private:
    Ui::MainWindow *ui;
    QMediaPlayer *Player;
    QVideoWidget *Video;
    QAudioOutput* audioOutput ;
    qint64 mDuration;
    bool is_Paused = true;
    bool is_muted = false;

};
#endif // MAINWINDOW_H
