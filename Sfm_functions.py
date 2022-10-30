import numpy as np
import cv2 
import matplotlib.pyplot as plt
import glob

def resizeImage(img,scale_percent):
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dimensions = (width, height)
    img = cv2.resize(img, dimensions, interpolation = cv2.INTER_AREA)
    return img

def calculateFundamentalMatrix(img1,img2):
    # Initiate SIFT detector
    sift = cv2.SIFT_create()
    # find the keypoints and descriptors with SIFT
    kp1, des1 = sift.detectAndCompute(img1,None)
    kp2, des2 = sift.detectAndCompute(img2,None)
    # FLANN parameters
    FLANN_INDEX_KDTREE = 1
    index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
    search_params = dict(checks=50)   # or pass empty dictionary
    flann = cv2.FlannBasedMatcher(index_params,search_params)
    matches = flann.knnMatch(des1,des2,k=2)
    pts1 = []
    pts2 = []
    # Need to draw only good matches, so create a mask
    matchesMask = [[0,0] for i in range(len(matches))]
    # ratio test as per Lowe's paper
    for i,(m,n) in enumerate(matches):
        if m.distance < 0.7*n.distance:
            matchesMask[i]=[1,0]
            pts2.append(kp2[m.trainIdx].pt)
            pts1.append(kp1[m.queryIdx].pt)
    draw_params = dict(matchColor = (0,255,0),
                    singlePointColor = (255,0,0),
                    matchesMask = matchesMask,
                    flags = cv2.DrawMatchesFlags_DEFAULT)
    pts1 = np.int32(pts1)
    pts2 = np.int32(pts2)
    F, mask = cv2.findFundamentalMat(pts1,pts2,cv2.FM_LMEDS)
    # We select only inlier points
    pts1 = pts1[mask.ravel()==1]
    pts2 = pts2[mask.ravel()==1]
    return F,pts1,pts2

def calculateCameraCaliberationMatrix(folderpath,chessboard_dimensions):
    chessboard_size = chessboard_dimensions[0]
    #Define arrays to save detected points
    obj_points = [] #3D points in real world space 
    img_points = [] #3D points in image plane
    #Prepare grid and points to display
    objp = np.zeros((np.prod(chessboard_size),3),dtype=np.float32)
    objp[:,:2] = np.mgrid[0:chessboard_size[0], 0:chessboard_size[1]].T.reshape(-1,2)
    objp = objp * chessboard_dimensions[1]
    calibration_paths = glob.glob(f'{folderpath}/*.jpg')
    #Iterate over images to find intrinsic matrix
    for image_path in calibration_paths:
        #Load image
        image = cv2.imread(image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        #print("Image loaded, Analizying...") [DEBUGGING]
        #find chessboard corners
        ret,corners = cv2.findChessboardCorners(gray_image, chessboard_size, None)
        if ret == True:
            #print("Chessboard detected!")  [DEBUGGING]
            #define criteria for subpixel accuracy
            criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
            #refine corner location (to subpixel accuracy) based on criteria.
            cv2.cornerSubPix(gray_image, corners, (5,5), (-1,-1), criteria)
            obj_points.append(objp)
            img_points.append(corners)
    ret, K, dist, rvecs, tvecs = cv2.calibrateCamera(obj_points, img_points,gray_image.shape[::-1], None, None) 
    return K,dist


def FindProjectionMatrix(rotationMatrix,translationVector,K):
    if(np.shape(rotationMatrix)!=(3,3)):
        R = cv2.Rodrigues(rotationMatrix[0])[0]
        print('debug')
    R =rotationMatrix
    Rt = np.concatenate([R,translationVector], axis=-1) # [R|t]
    P = np.matmul(K,Rt) # A[R|t]
    return P

print('Functions made')
