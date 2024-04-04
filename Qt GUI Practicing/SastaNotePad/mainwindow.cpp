#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "qmessagebox.h"
#include "QApplication"
#include "QTimer"
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_actionQuit_triggered()
{
 //   QTimer::singleShot(200 , this , &MainWindow::Qu)
    QApplication::quit();
}


void MainWindow::on_actionAbout_triggered()
{
    QMessageBox::about(this , "Message" ,
                       "This is Sasta Note Pad Made by tecknotrove dedicated employee");
}


void MainWindow::on_actionAboutQt_triggered()
{
    QApplication::aboutQt();
}

void MainWindow::on_actionCopy_triggered()
{
      ui->textEdit->copy();

}

void MainWindow::on_actionCut_triggered()
{
    ui->textEdit->cut();
}

void MainWindow::on_actionPaste_triggered()
{
    ui->textEdit->paste();
}


void MainWindow::on_actionUndo_triggered()
{
    ui->textEdit->undo();
}


void MainWindow::on_actionRedu_triggered()
{
    ui->textEdit->redo();
}





